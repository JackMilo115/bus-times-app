<script lang=ts>
    import { getTimetable } from "./sampleData";
    function getTime(StopPointRef, timetable :Awaited <ReturnType<typeof getTimetable>>)
    {
        const parternRefID = timetable.TransXChange.JourneyPatternSections.JourneyPatternSection.JourneyPatternTimingLink.find(link => link.To.StopPointRef == StopPointRef)?._id;
        const time = timetable.TransXChange.VehicleJourneys.VehicleJourney.VehicleJourneyTimingLink.find(link => link.JourneyPatternTimingLinkRef == parternRefID)?.RunTime;
        return time;
    }

</script>

<div class="timetable">    
    {#await getTimetable()}
        waiting...
    {:then timetable}
        <h1>{timetable.TransXChange.Services.Service.ServiceCode} Bus Time Table</h1>
        <h2 class="operator-name">{timetable.TransXChange.Operators.LicensedOperator.OperatorShortName}</h2>
        <ul>
            {#each timetable.TransXChange.StopPoints.AnnotatedStopPointRef as location}
                <li>
                    {location.CommonName}
                    {getTime(location.StopPointRef, timetable)}
                </li>
            {/each}
        </ul>
        <pre>{JSON.stringify(timetable, null, 2)}</pre>
    {/await}
</div>

<style>
    .timetable{
        text-align:left
    }
    .operator-name{
        color:#0008;
    }
</style>