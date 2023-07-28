<template>
  <Dataset
    v-slot="{ ds }"
    :ds-data="dataset"
    :ds-sortby="sortBy"
    :ds-search-in="indexes"
  >
    <div class="row" :data-page-count="ds.dsPagecount">
      <div id="datasetLength" class="col-md py-2">
        <DatasetShow />
      </div>
      <div class="col-md-10 py-2 row gap-2">
        <div class="col-12 col-md">
          <DatasetSearch ds-search-placeholder="Search..." />
        </div>

        <div class="col-12 col-md-6 d-flex gap-2">
          <slot name="controller"></slot>
          <div class="col d-flex justify-content-end">
            <div class="dropdown">
            <button
              type="button"
              class="btn btn-outline-primary"
              :class="{ 'dropdown-toggle': !isExporting }"
              id="dropdown-default-primary"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              :disabled="isExporting"
            >
              Export
              <span
                v-if="isExporting"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
            <div
              class="dropdown-menu fs-sm"
              aria-labelledby="dropdown-default-primary"
            >
              <a
                class="dropdown-item"
                href="javascript:void(0)"
                @click="exportAsExcel"
                >as Excel</a
              >
              <a
                class="dropdown-item"
                href="javascript:void(0)"
                @click="exportAsCSV"
                >as CSV</a
              >
              <a
                class="dropdown-item"
                href="javascript:void(0)"
                @click="exportAsPDF"
                >as PDF</a
              >
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item"
                href="javascript:void(0)"
                @click="copyToClipboard"
                >to Clipboard</a
              >
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th
                  v-for="(th, index) in cols"
                  :key="th.field"
                  :class="['sort', th.sort]"
                  @click="onSort($event, index)"
                >
                  {{ th.name }} <i class="gg-select float-end"></i>
                </th>
              </tr>
            </thead>
            <DatasetItem tag="tbody" class="fs-sm">
              <template #default="{ row, rowIndex }"
                ><slot :row="row" :row-index="rowIndex"></slot
              ></template>
            </DatasetItem>
          </table>
        </div>
      </div>
    </div>
    <div
      class="d-flex flex-md-row flex-column justify-content-between align-items-center"
    >
      <DatasetInfo class="py-3 fs-sm" />
      <DatasetPager class="flex-wrap py-3 fs-sm" />
    </div>
  </Dataset>
</template>
<script setup>
import ExportPdfWorker from "~/assets/workers/export-pdf?worker";
import ExportExcelWorker from "~/assets/workers/export-excel?worker";
import { toFormatedText, downloadFile, toCSVFile } from "~/assets/utils";

import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";

const props = defineProps({
  dataset: Array,
  indexes: Array,
  columns: Array,
  name: {
    type: String,
    default: "dataset"
  }
});

const cols = reactive(
  
  props.columns.map((key) => {
    
    if ( typeof key === "string" ) return { name: key, field: key, type: "text" }

    else return { name: undefined, field: undefined, type: "text", ...key };

  })

);

const baseSearchTerm = ref("");

const onSubmitSearch = () => {};

const isExporting = ref(false);


// Sort by functionality
const sortBy = computed(() => {
  return cols.reduce((acc, o) => {
    if (o.sort) {
      o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
    }
    return acc;
  }, []);
});

// On sort th click
function onSort(event, i) {
  let toset;
  const sortEl = cols[i];

  if (!event.shiftKey) {
    cols.forEach((o) => {
      if (o.field !== sortEl.field) {
        o.sort = "";
      }
    });
  }

  if (!sortEl.sort) {
    toset = "asc";
  }

  if (sortEl.sort === "desc") {
    toset = event.shiftKey ? "" : "asc";
  }

  if (sortEl.sort === "asc") {
    toset = "desc";
  }

  sortEl.sort = toset;
}

// Apply a few Bootstrap 5 optimizations
onMounted(() => {
  // Remove labels from
  document.querySelectorAll("#datasetLength label").forEach((el) => {
    el.remove();
  });

  // Replace select classes
  let selectLength = document.querySelector("#datasetLength select");

  selectLength.classList = "";
  selectLength.classList.add("form-select");
  selectLength.style.width = "80px";
});

// TODO: copy based on current view
const copyToClipboard = () => {
  const data = props.dataset.map((student) => {
    let studentCopy = { ...student };
    delete studentCopy["profile_image"];
    return studentCopy;
  });

  const text = toFormatedText(data);

  navigator.clipboard.writeText(text);
};

// TODO: export based on current view
const exportAsExcel = () => {
  const exportExcelWorker = new ExportExcelWorker();

  const dataset = JSON.parse(JSON.stringify(props.dataset))
  exportExcelWorker.postMessage({ dataset, __omit: "profile_image" });

  setTimeout(() => (isExporting.value = true), 0);

  exportExcelWorker.addEventListener("message", (event) => {
    downloadFile(props.name, event.data, "xlsb");

    setTimeout(() => (isExporting.value = false), 0);
  });
};

// TODO: export based on current view
const exportAsPDF = () => {
  const exportPdfWorker = new ExportPdfWorker();

  const dataset = JSON.parse(JSON.stringify(props.dataset))
  exportPdfWorker.postMessage({ dataset, __image: "profile_image" });

  setTimeout(() => (isExporting.value = true), 0);

  exportPdfWorker.addEventListener("message", (event) => {
    downloadFile(props.name, event.data, "pdf");

    setTimeout(() => (isExporting.value = false), 0);
  });
};

// TODO: export based on current view
const exportAsCSV = () => {
  setTimeout(() => (isExporting.value = true), 0);

  const data = props.dataset.map((student) => {
    let studentCopy = { ...student };
    delete studentCopy["profile_image"];
    return studentCopy;
  });
  const datasetAsCSV = toCSVFile(data);
  downloadFile(props.name, datasetAsCSV, "csv");

  setTimeout(() => (isExporting.value = false), 0);
};
</script>
<style lang="scss" scoped>
@import "~/assets/scss/oneui/_variables-bootstrap";

.gg-select {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(1);
  width: 22px;
  height: 22px;
}
.gg-select::after,
.gg-select::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  left: 7px;
  transform: rotate(-45deg);
}
.gg-select::before {
  border-left: 2px solid;
  border-bottom: 2px solid;
  bottom: 4px;
  opacity: 0.3;
}
.gg-select::after {
  border-right: 2px solid;
  border-top: 2px solid;
  top: 4px;
  opacity: 0.3;
}
th.sort {
  cursor: pointer;
  user-select: none;
  &.asc {
    .gg-select::after {
      opacity: 1;
    }
  }
  &.desc {
    .gg-select::before {
      opacity: 1;
    }
  }
}

.image {
  transition: transform 0.15s ease-out, opacity 0.15s ease-out,
    box-shadow 0.15s ease-out;

  &:hover {
    box-shadow: 0 0.5rem 2.5rem darken($light, 6%);
    transform: translateY(-2px);
    opacity: 1;
  }
}
</style>
