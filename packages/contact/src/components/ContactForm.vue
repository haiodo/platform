<!--
// Copyright © 2020 Anticrm Platform Contributors.
// 
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// 
// See the License for the specific language governing permissions and
// limitations under the License.
-->

<script lang="ts">
import { defineComponent, ref, reactive, inject, computed, PropType } from 'vue'
import core, { Ref, Instance } from '@anticrm/platform-core'
import { AnyComponent } from '@anticrm/platform-ui'
import { injectPlatform } from '@anticrm/platform-vue'
import { Person } from '..'

import InlineEdit from '@anticrm/sparkling-controls/src/InlineEdit.vue'
import ObjectPanel from '@anticrm/platform-vue/src/components/ObjectPanel.vue'
import Table from '@anticrm/platform-vue/src/components/Table.vue'

export default defineComponent({
  components: { InlineEdit, ObjectPanel, Table },
  props: {
    content: String as unknown as PropType<Ref<Person>>
  },
  async setup (props, context) {
    const _ = await injectPlatform({ core: core.id })
    const coreService = _.deps.core

    const instance = await coreService.getInstance(props.content)

    console.log('CONTENT!!!!!')
    console.log(instance)
    console.log(instance.firstName)
    return {
      instance
    }
  }
})
</script>

<!-- Must use v-model, but dont work for me with Vue3 -->

<template>
  <div>
    <div>
      <InlineEdit class="caption-1" v-model="instance.lastName" placeholder="Фамилия" />
    </div>
    <div>
      <InlineEdit class="caption-2" v-model="instance.firstName" placeholder="Имя Отчество" />
    </div>
    <Suspense>
      <ObjectPanel
        :instance="instance"
        top="class:core.Doc"
        exclude="firstName, lastName"
        style="margin-top: 2em"
      />
    </Suspense>
  </div>
</template>

<style scoped lang="scss">
@import "~@anticrm/sparkling-theme/css/_variables.scss";

.container {
  display: inline-flex;
}
</style>
