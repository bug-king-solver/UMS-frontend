<template>
    <NuxtLayout name="dashboard">
      <div class="content bg-body" style="height: 100vh">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb push">
            <li class="breadcrumb-item">
              <NuxtLink to="/accounting">Accounting</NuxtLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">View Transactions</li>
          </ol>
        </nav>
        <BaseForm ref="form" @submit="onSubmit">
          
            <div class="row">
            <div class="col-md-9">
                <div class="d-flex justify-content-around my-4">
                  <div v-for="(budget, index) in budgets" :key="index">
                    <BudgeBlock :totalAmount=budget.total :descriptions=budget.desc />
                  </div>
                </div>
                <BaseBlock title="Transactions" content-full>
                  <EditableTable />
                </BaseBlock>
            </div>
            <div class="col-md-3">
              <BaseBlock title="Date Ranges" bordered="true">
                <ButtonGroup />
              </BaseBlock>
              <BaseBlock title="Accounting Tree" bordered="true">
                <div class="mb-3">
                  <TreeNode :node="treeData"/>
                </div>
              </BaseBlock>
            </div>
          </div>
        </BaseForm>
      </div>
    </NuxtLayout>
  </template>
  <script setup>
  const budgets = [
    {
        total: '10,000',
        desc: 'Total indebted'
    },
    {
        total: '5,000',
        desc: 'Total Credited'
    },
    {
        total: '5,000',
        desc: 'Total Balance'
    }
  ];
  const treeData = {
  name: 'Category',
  children: [
    {
      name: 'Sub-Category',
      children: [
        {
          name: 'Sub-Category',
          children: [
            {
              name: 'Account',
            }
          ]
        },
        {
          name: 'Account',
        },
      ],
    },
    {
      name: 'Account',
    },
  ],
};
  </script>
  <style>

  </style>
  