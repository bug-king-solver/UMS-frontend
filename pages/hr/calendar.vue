<template>
    <NuxtLayout name="dashboard">
        <div class="content px-5">
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb push">
              <li class="breadcrumb-item">
                <NuxtLink to="/hr">HR</NuxtLink>
              </li>
              <li class="breadcrumb-item">
                <NuxtLink to="/hr/entrance-and-attendance">Entrance & Attendance</NuxtLink>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Calendar
              </li>
            </ol>
          </nav>
            <BaseBlock class="pb-3">
                  <FullCalendar
                    ref="fullCalendar"
                    :options="calendarOptions"
                  ></FullCalendar>
            </BaseBlock>
        </div>
    </NuxtLayout>
</template>
<script setup>
// FullCalendar, for more info and examples you can check out https://fullcalendar.io/
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

// Helper variables
const fullCalendar = ref(null);

// Init Calendar
// Get current year, month and day
let date = new Date();

let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();

// Calendar options, variables and events
const calendarOptions = reactive({
  events: [
    {
      title: "Total Not Attending : \n 10 Employees",
      start: new Date(y, m, d),
      allDay: true,
    },
    {
      title: "Total Late Coming : 10 Employees",
      start: new Date(y, m, d),
      allDay: true,
    },
    {
      title: "Total Early Going : 10 Employees",
      start: new Date(y, m, d),
      allDay: true,
    },
    {
      title: "Total Leaves : 10 Employees",
      start: new Date(y, m, d),
      allDay: true,
    },
  ],
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  firstDay: 1,
  headerToolbar: {
    left: "title",
    right: "prev,next today dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  },
  height: 600,
  resize: true
});
</script>

<style lang="scss">
// FullCalendar custom overrides
@import "@/assets/scss/vendor/fullcalendar";
</style>
