const routes = [
  {
    path: "/",
    redirect: "list-of-users",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "list-of-users",
        name: "list-of-users",
        component: () => import("pages/ListOfUsers.vue"),
      },
      {
        path: "add-user",
        name: "add-user",
        component: () => import("pages/AddUser.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
