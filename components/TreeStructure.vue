<template>
  <tree style="cursor: pointer;" :config="config" :nodes="nodes">
  </tree>
</template>

<script>
import treeview from "vue3-treeview";
import "vue3-treeview/dist/style.css";

export default {
  components: {
    tree: treeview,
  },
  data: function () {
    return {
      nodes: {
        id1: {
          text: "Category",
          children: ["id11", "id12", 'id13', 'id111'],
        },
        id11: {
          text: "Sub-Category",
          children: ["id112"],
        },
        id12: {
          text: "Sub-Category",
          children: ["id111"],
        },
        id13: {
          text: "Sub-Category",
          children: ["id111"]
        },
        id111: {
          text: "Account",
        },
        id112: {
          text: 'Sub-Category',
          children: ['id111']
        },
      },
      config: {
        roots: ["id1"],
        openedIcon: {
          type: "class",
          class: "fas fa-folder-open",
        },
        closedIcon: {
          type: "class",
          class: "fas fa-folder",
        },
      },
    };
  },
};
</script>

