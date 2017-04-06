
import sqlite3
import json
import datetime
import psycopg2 as pg
### SIMPLE READ

### NOTE: Cron needs absolute paths
# To run replace the base_path or remove it from api_file and con calls

### CREATE POSTGRES CONN
db_info = {
	'database' : 'postgres'
	,'host' : 'localhost'
	,'username' : 'postgres'
	,'password' : ''
}
connect_string = "dbname='" + db_info['database'] + "'" + "host='" + db_info['host'] + "'" + "user='" + db_info['username'] + "'" + "password='" + db_info['password'] + "'"
conn = pg.connect(connect_string)
cur = conn.cursor()
        

### CREATE SQLITE CON AND GET RAW DATA
query_get_json = 'SELECT raw FROM busraw'

base_path = '/Users/emil/Documents/code/open_data/open_sthml/bus_delay/bus_get_raw/'
sqlite_conn = sqlite3.connect(base_path + 'bus_raw_1day.db')
cread = sqlite_conn.cursor()
cread.execute(query_get_json)
raw_data = cread.fetchall()
cread.close()
sqlite_conn.close()

### SETUP JSON FIELD TO EXTRACT
bus_keys = ["Destination",
"StopAreaName",
"TimeTabledDateTime",
"ExpectedDateTime",
"LineNumber"]

### PREP STATEMENT FOR INSERT IN POSTGRES
query_insert_bus_base = '''INSERT INTO journey (
	trip_headsign
	, goto_station 
	, time_timetable 
	, time_expected 
	, line 
	, time_last_updated 
	, time_delta) 
	VALUES '''

query_ignore_clause = ' ON CONFLICT(line,trip_headsign,goto_station,time_last_updated,time_timetable) DO NOTHING'

### INITIALIZE BATCH VAR, AND SET BATCH SIZE
bus_values = ''
batch_size = 10

### EXTRACT !!!!
for idx,row in enumerate(raw_data):
	j = json.loads(row[0])
	print(idx)
	if ('ResponseData' in j) and ('LatestUpdate' in j['ResponseData']) and ('Buses' in j['ResponseData']):
		pass
	else:
		print('=== SPECIAL CASE ===')
		print(j)
		continue

	time_last_updated = j['ResponseData']['LatestUpdate']
	t_last_updated = datetime.datetime.strptime(time_last_updated, '%Y-%m-%dT%H:%M:%S')


	for bus in j['ResponseData']['Buses']:
		bus_info = [bus[i] for i in bus_keys]
		# Reformat time
		t_table = datetime.datetime.strptime(bus_info[2], '%Y-%m-%dT%H:%M:%S')
		t_expect = datetime.datetime.strptime(bus_info[3], '%Y-%m-%dT%H:%M:%S')
		bus_info[2] = t_table
		bus_info[3] = t_expect

		### Append info
		bus_info.append(t_last_updated)
		# Do time delta		
		bus_info.append((t_expect - t_table).total_seconds())

		if bus_values != '':
			bus_values += ','
		
		bus_values += "('%s','%s','%s','%s','%s','%s',%s)" % tuple(bus_info)

		if (idx+1)%batch_size==0:
			cur.execute(query_insert_bus_base+bus_values+query_ignore_clause+';')
			bus_values = ''
			

        
conn.commit()

cur.close()
conn.close()