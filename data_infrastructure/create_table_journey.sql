CREATE TABLE IF NOT EXISTS journey_test (
id integer primary key
,line text
, direction text
, goto_station text
, time_last_updated timestamp
, time_timetable timestamp
, time_expected timestamp
, time_delta numeric
, UNIQUE(line,direction,goto_station,time_last_updated,time_timetable)
);
