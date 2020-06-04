//
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
//

import { Platform } from '@anticrm/platform'

import core, { Doc } from '@anticrm/platform-core'
import i18n from '@anticrm/platform-core-i18n'
import ui from '@anticrm/platform-ui'
import uiComponents from '@anticrm/platform-vue'
import workbench from '@anticrm/platform-workbench'
import contact from '@anticrm/contact'
// import demo from '@anticrm/demo-3d'
import mc from '@anticrm/app-mission-control'

import { createApp } from 'vue'
import ErrorPage from './components/ErrorPage.vue'

// import uiMeta from '@anticrm/platform-ui-model/src/__resources__/meta'
import contactMeta from '@anticrm/contact/src/__model__/meta'

const metaModel = require('./model.json') as Doc[]
const strings = require('./strings.json') as Record<string, string>

const platform = new Platform()
platform.setMetadata(core.metadata.MetaModel, metaModel)
platform.setMetadata(i18n.metadata.BootStrings, strings)
platform.setMetadata(ui.metadata.DefaultApplication, mc.component.MissionControl)
platform.setMetadata(mc.metadata.Applications, [
  workbench.component.Workbench,
  // demo.component.Periodic
])

platform.addLocation(core, () => import(/* webpackChunkName: "platform-core" */ '@anticrm/platform-core/src/plugin'))
platform.addLocation(i18n, () => import(/* webpackChunkName: "platform-core-i18n" */ '@anticrm/platform-core-i18n/src/plugin'))
platform.addLocation(ui, () => import(/* webpackChunkName: "platform-ui" */ '@anticrm/platform-ui/src/plugin'))
platform.addLocation(uiComponents, () => import(/* webpackChunkName: "platform-vue" */ '@anticrm/platform-vue/src/plugin'))
platform.addLocation(workbench, () => import(/* webpackChunkName: "platform-workbench" */ '@anticrm/platform-workbench/src/plugin'))
platform.addLocation(contact, () => import(/* webpackChunkName: "contact" */ '@anticrm/contact/src/plugin'))
// platform.addLocation(demo, () => import(/* webpackChunkName: "demo-3d" */ '@anticrm/demo-3d/src/plugin'))
platform.addLocation(mc, () => import(/* webpackChunkName: "mission-control" */ '@anticrm/app-mission-control/src/plugin'))

// uiMeta(platform)
contactMeta(platform)

async function boot (): Promise<void> {
  const uiComponentsService = await platform.getPlugin(uiComponents.id)
  uiComponentsService.getApp().mount('#app')
}

boot().catch(err => {
  console.log(err)
  createApp(ErrorPage).mount('#app')
})
