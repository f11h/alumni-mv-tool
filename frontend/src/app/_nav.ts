export const navigation = [
    {
        title: true,
        name: 'Menü'
    },
    {
        name: 'Startseite',
        url: '/home',
        icon: 'icon-home'
    },
    {
        name: 'Meine Kaffees',
        url: '/purchases',
        icon: 'icon-cup'
    },
    {
        name: 'Kaffeemaschinen',
        url: '/machines',
        icon: 'fa fa-industry'
    },
    {
        name: 'Transaktionen',
        url: '/transactions',
        icon: 'fa fa-eur'
    },
    {
        name: 'Maschine steuern',
        url: '/control',
        icon: 'icon-feed'
    },
    {
        title: true,
        name: 'Administration',
        minPermission: 1000
    },
    {
        name: 'Benutzer',
        url: '/admin/user',
        icon: 'icon-user',
        minPermission: 1000
    },
    {
        name: 'Karten',
        url: '/admin/cards',
        icon: 'icon-credit-card',
        minPermission: 1000
    },
    {
        name: 'Zahlung erfassen',
        url: '/admin/payments',
        icon: 'icon-plus',
        minPermission: 1000
    }
];
