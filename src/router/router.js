import { createRouter, createWebHistory } from 'vue-router';

import MainInfo from '../pages/MainInfo';
import AvailableLocations from '../pages/AvailableLocations';
import RolesPage from '../pages/RolesPage';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
          path: '/',
          redirect: '/main-info'
        },
        {
          path: '/main-info',
          component: MainInfo,
        },
        {
          name: 'AvailableLocations',
          path: '/available-locations',
          component: AvailableLocations,
        },
        { path: '/roles',
        component: RolesPage,
      }
    ]
});

export default router;