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
          <BaseBlock title="Transactions" content-full>
            <div class="row">
            <div class="col-9">
                <div class="d-flex justify-content-around my-4">
                  <div v-for="(budget, index) in budgets" :key="index">
                    <BudgeBlock :totalAmount=budget.total :descriptions=budget.desc />
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-striped table-vcenter">
                    <thead>
                      <tr class="text-center">
                        <th class="bg-gray-dark text-gray-lighter">ID</th>
                        <th class="bg-gray-dark text-gray-lighter">Type</th>
                        <th class="bg-gray-dark text-gray-lighter">Indebted</th>
                        <th class="bg-gray-dark text-gray-lighter">Creditor</th>
                        <th class="bg-gray-dark text-gray-lighter">Files</th>
                        <th class="bg-gray-dark text-gray-lighter">Notes</th>
                        <th class="bg-gray-dark text-gray-lighter">Transacted With</th>
                        <th class="bg-gray-dark text-gray-lighter">Added By</th>
                        <th class="bg-gray-dark text-gray-lighter">Date/Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
            <div class="col-3">
              <BaseBlock title="Date Ranges" bordered="true">
                <ButtonGroup />
              </BaseBlock>
              <BaseBlock title="Accounting Tree" bordered="true">
                <TreeStructure></TreeStructure>
              </BaseBlock>
            </div>
          </div>
        </BaseBlock>
        </BaseForm>
      </div>
    </NuxtLayout>
  </template>
  <script setup>
  import { ref } from 'vue'
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
  </script>
  <style>

  </style>
  