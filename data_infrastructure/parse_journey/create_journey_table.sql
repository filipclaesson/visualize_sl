CREATE TABLE IF NOT EXISTS journey (
id integer NOT NULL IDENTITY(1,1) 
,line text
, trip_headsign text
, goto_station text
, time_last_updated timestamp
, time_timetable timestamp
, time_expected timestamp
, time_delta numeric
, UNIQUE(line,trip_headsign,goto_station,time_last_updated,time_timetable)
);