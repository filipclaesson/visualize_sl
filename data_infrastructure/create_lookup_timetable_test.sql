CREATE TABLE lookup_timetable_test AS (
with base as (
select 
t.* 
,r.route_short_name
from trips t
left join routes r on t.route_id = r.route_id
left join agency a on a.agency_id = r.agency_id
where r.route_short_name in ('59','57')
and agency_name = 'SL'
)
,stops as (
select
arrival_time
, departure_time
, stop_sequence
, stop_name
--,sum(1) over (partition by b.trip_id) num_stops
, b.trip_id
, b.trip_headsign 
, b.route_short_name 
, stop_lon
, stop_lat
from base b
left join stop_times st on b.trip_id = st.trip_id
left join stops s on st.stop_id = s.stop_id
)
SELECT 
last_value(departure_time::interval)OVER w - first_value(departure_time::interval) OVER w  as delta
,*
FROM stops
WINDOW w AS (PARTITION BY trip_id ORDER BY stop_sequence::int ASC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)
order by trip_id, stop_sequence::numeric
);
