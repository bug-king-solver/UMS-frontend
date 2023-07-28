<template>
  <NuxtLayout name="dashboard">
    <div class="content">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb push">
          <li class="breadcrumb-item">
            <NuxtLink to="/hr">HR</NuxtLink>
          </li>
          <li class="breadcrumb-item">
            <NuxtLink to="/hr/entrance-and-attendance">Entrance & Attendance</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Attendance Settings
          </li>
        </ol>
      </nav>
        <BaseBlock title="Attendance Settings" content-full>
            
            <div>

                <div class="row">
                  
                  <div class="mb-4 col-4">
                    <div class="input-group">
                      <span class="input-group-text input-group-text-alt">Group Name</span>
                      <input
                        type="text"
                        class="form-control form-control-alt"
                        readonly
                        id="group-name"
                        name="group-name"
                      />
                    </div>
                  </div>

                  <div class="mb-4 col-4">
                    <div class="input-group">
                      <span class="input-group-text input-group-text-alt">Days Per Week</span>
                      <input
                        type="text"
                        class="form-control form-control-alt"
                        readonly
                        :value="selectedDays.length"
                        id="group-name"
                        name="group-name"
                      />
                    </div>
                  </div>

                  <div class="mb-4 col-4">
                    <div class="input-group">
                      <span class="input-group-text input-group-text-alt">Hours Per Week</span>
                      <input
                        type="text"
                        class="form-control form-control-alt"
                        id="group-name"
                        readonly
                        :value="totalHours"
                        name="group-name"
                      />
                    </div>
                  </div>
                </div>

          </div>
    
          <table class="table table-vcenter">
            <thead>
              <tr>
                <th>Week Days</th>
                <th class="d-none d-sm-table-cell">Check In</th>
                <th class="d-none d-sm-table-cell">Check Out</th>
                <th class="d-none d-sm-table-cell">Total Hours</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="fw-semibold fs-sm">
                        <!-- TODO: make it more human readable -->
                        Set {{ humanReadableSelectedDays }} To
                    </td>
                    <td class="fw-semibold fs-sm">
                        <input @input="setCheckIn" type="time" v-model="checkin" class="form-controller">
                    </td>
                    <td class="fw-semibold fs-sm">
                        <input @input="setCheckOut" type="time" v-model="checkout" class="form-controller">
                    </td>
                    <td class="fw-semibold fs-sm">
                        {{ calculateTime(checkin, checkout) }}
                    </td>
                </tr>
              <tr v-for="(time, day) in weekdays" :key="day">
                <td class="fw-semibold fs-sm">
                  <div style="width: 100px">
                    <BaseCheckbox :label="day" :name="day" v-model="selectedDays"></BaseCheckbox>
                  </div>
                </td>
                <td class="fw-semibold fs-sm">
                  <input type="time" :value="time.checkin" @input="$event => weekdays[day].checkin = $event.target.value" />
                </td>
                <td class="fw-semibold fs-sm">
                  <input type="time" :value="time.checkout" @input="$event => weekdays[day].checkout = $event.target.value" />
                </td>
                <td class="fw-semibold fs-sm">
                  <div>{{ calculateTime(time.checkin, time.checkout) }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </BaseBlock>
    </div>
  </NuxtLayout>
</template>
<script setup>
const weekdays = reactive({
  Sunday: { checkin: "08:00", checkout: "17:00" },
  Monday: { checkin: "08:00", checkout: "17:00" },
  Tuesday: { checkin: "08:00", checkout: "17:00" },
  Wednesday: { checkin: "08:00", checkout: "17:00" },
  Thursday: { checkin: "08:00", checkout: "17:00" },
  Friday: { checkin: "08:00", checkout: "17:00" },
  Saturday: { checkin: "08:00", checkout: "17:00" },
});

const selectedDays = ref([]);
const humanReadableSelectedDays = computed(() => {

  if ( selectedDays.value.length >= 4 && selectedDays.value.length < 7 ) return `${selectedDays.value[0]} . . . ${selectedDays.value[selectedDays.value.length - 1]}`
  
  if ( selectedDays.value.length < 7 ) return selectedDays.value.join(", ");

  else return "All Days"

})

const totalHours = computed(() => Object.values(weekdays).reduce((prev, day) => prev + calculateTime(day.checkin, day.checkout), 0))

const checkin = ref("08:00:00");
const checkout = ref("17:00:00")

const calculateTime = (checkin, checkout) => {
    const start = checkin.split(':');  
    const end = checkout.split(':');  
    const diff = (end[0]*60 + (+end[1])) - (start[0]*60 + (+start[1]));
    return Math.floor(diff / 60);
}

const setCheckIn = ({ target: { value } }) => {

    selectedDays.value.forEach( selectedDay => weekdays[selectedDay].checkin = value);

}

const setCheckOut = ({ target: { value } }) => {

    selectedDays.value.forEach( selectedDay => weekdays[selectedDay].checkout = value)

}

</script>
