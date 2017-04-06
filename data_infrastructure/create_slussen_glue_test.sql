DROP TABLE IF EXISTS slussen_glue_table;
CREATE TABLE IF NOT EXISTS slussen_glue_table AS(

with goto_station as(
SELECT delta,trip_id,route_short_name,trip_headsign
FROM lookup_timetable_test2 
--WHERE stop_name='Slussen T-bana'
WHERE stop_name ilike '%slussen%'
)

SELECT 
base.delta-goto.delta as goto_delta
,base.trip_id
,base.route_short_name
,base.trip_headsign
,base.stop_name
FROM lookup_timetable_test2 base
LEFT JOIN goto_station goto ON ((base.trip_id,base.route_short_name,base.trip_headsign)=(goto.trip_id,goto.route_short_name,goto.trip_headsign))

);



select * from lookup_timetable_test2 lt
left join slussen_glue_table goto ON ((lt.trip_id,lt.route_short_name,lt.trip_headsign,lt.stop_name)=(goto.trip_id,goto.route_short_name,goto.trip_headsign,goto.stop_name))
inner join journey j 
on ((j.line,j.trip_headsign,extract(EPOCH from (j.time_timetable::time)::interval)) = (lt.route_short_name, lt.trip_headsign, mod(extract(EPOCH from lt.departure_time::interval-goto.goto_delta::interval)::int, 86400)))


