<script lang=ts>
    import {getTimetable} from "./sampleData";
    import {parseBusTime} from "./utils.js";

    function getTime(StopPointRef, timetable: Awaited<ReturnType<typeof getTimetable>>) {
        const parternRefID = timetable.TransXChange.JourneyPatternSections.JourneyPatternSection.JourneyPatternTimingLink.find(link => link.To.StopPointRef == StopPointRef)?._id;
        const time = timetable.TransXChange.VehicleJourneys.VehicleJourney.VehicleJourneyTimingLink.find(link => link.JourneyPatternTimingLinkRef == parternRefID)?.RunTime;
        return parseBusTime(time);
    }

    function processTimetable(timetable: Awaited<ReturnType<typeof getTimetable>>) {
        const stops = []
        const departureTime = timetable.TransXChange.VehicleJourneys.VehicleJourney.DepartureTime
        const time = new Date(new Date().toISOString().slice(0, 11) + departureTime)
        for (const location of timetable.TransXChange.StopPoints.AnnotatedStopPointRef) {
            const parternRefID = timetable.TransXChange.JourneyPatternSections.JourneyPatternSection.JourneyPatternTimingLink.find(link => link.To.StopPointRef == location.StopPointRef)?._id;
            const duration = timetable.TransXChange.VehicleJourneys.VehicleJourney.VehicleJourneyTimingLink.find(link => link.JourneyPatternTimingLinkRef == parternRefID)?.RunTime;
            const timeFromPrevious = parseBusTime(duration);
            time.setSeconds(time.getSeconds() + timeFromPrevious)
            stops.push({
                name: location.CommonName,
                stopPointRef: location.StopPointRef,
                timeFromPrevious,
                time: time.toLocaleTimeString()
            })
        }
        return stops
    }

</script>

<div class="timetable">
    {#await getTimetable()}
        waiting...
    {:then timetable}
        <h1>{timetable.TransXChange.Services.Service.ServiceCode} Bus Time Table</h1>
        <h2 class="operator-name">{timetable.TransXChange.Operators.LicensedOperator.OperatorShortName}</h2>
        <ul>
            {#each processTimetable(timetable) as location}
                <li>
                    {location.name}
                    {location.time}
                </li>
            {/each}
        </ul>
        <pre>{JSON.stringify(timetable, null, 2)}</pre>
    {/await}
</div>

<style>
    .timetable {
        text-align: left
    }

    .operator-name {
        color: #0008;
    }
</style>