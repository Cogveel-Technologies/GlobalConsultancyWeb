import { RouteInfo } from './sidebar.metadata';

const menu = localStorage.getItem('menu');
// console.log(menu)
// export const ROUTES: RouteInfo[] = JSON.parse(menu);

export const ROUTES: RouteInfo[] = [
    {
                path: '',
                title: 'MENUITEMS.CONSULTANCY.TEXT',
                icon: 'plus-circle',
                class: 'menu-toggle',
                groupTitle: false,
                submenu: [
                  {
                    path: 'consultancy/register-consultancy',
                    title: 'MENUITEMS.CONSULTANCY.LIST.REGISTER_CONSULTANCY',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },
                  {
                    path: 'consultancy/consultancy-list',
                    title: 'MENUITEMS.CONSULTANCY.LIST.CONSULTANCY_LIST',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },
                  {
                    path: 'consultancy/register-institute',
                    title: 'MENUITEMS.CONSULTANCY.LIST.REGISTER_INSTITUTE',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },
                  {
                    path: 'consultancy/institution-list',
                    title: 'MENUITEMS.CONSULTANCY.LIST.INSTITUTION-LIST',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },
                  {
                    path: 'consultancy/register-program',
                    title: 'MENUITEMS.CONSULTANCY.LIST.REGISTER-PROGRAM',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },  {
                    path: 'consultancy/program-list',
                    title: 'MENUITEMS.CONSULTANCY.LIST.PROGRAM-LIST',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },
                  {
                    path: 'consultancy/register-intake',
                    title: 'MENUITEMS.CONSULTANCY.LIST.REGISTER-INTAKE',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },
                  {
                    path: 'consultancy/intake-list',
                    title: 'MENUITEMS.CONSULTANCY.LIST.INTAKE-LIST',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },
                  {
                    path: 'consultancy/register-session',
                    title: 'MENUITEMS.CONSULTANCY.LIST.REGISTER-SESSION',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },
                  {
                    path: 'consultancy/session-list',
                    title: 'MENUITEMS.CONSULTANCY.LIST.SESSION-LIST',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },
                  {
                    path: 'consultancy/register-agent',
                    title: 'MENUITEMS.CONSULTANCY.LIST.REGISTER-AGENT',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },
                  {
                    path: 'consultancy/agent-list',
                    title: 'MENUITEMS.CONSULTANCY.LIST.AGENT-LIST',
                    icon: '',
                    class: 'ml-menu',
                    groupTitle: false,
                    submenu: []
                  },]
    }

];
// console.log(ROUTES)

