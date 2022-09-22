/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  appDirectory: 'src',
  routes: async (defineRoutes) => {
    return defineRoutes((route) => {
      const abp = 'routes/authentication'; // basePath

      route('autenticacion', `${abp}.tsx`, () => {
        route('registro', `${abp}/sign-up.tsx`);
        route('verificar-cuenta', `${abp}/sign-up-confirm.tsx`);
        route('iniciar-sesion', `${abp}/sign-in.tsx`);
        route('olvide-mi-contrasena', `${abp}/forgotten-password.tsx`);
        route('recuperar-contrasena', `${abp}/password-recovery.tsx`);
        route('cerrar-sesion', `${abp}.sign-out.tsx`);
      });

      route('tablero', 'routes/dashboard.tsx');
      route('comenzar', 'routes/onboarding.tsx');
    });

    // {
    //   source: '/autenticacion/registro',
    //   destination: '/authentication/sign-up',
    // },
    // {
    //   source: '/autenticacion/verificar-cuenta',
    //   destination: '/authentication/sign-up-confirm',
    // },
    // {
    //   source: '/autenticacion/iniciar-sesion',
    //   destination: '/authentication/sign-in',
    // },
    // {
    //   source: '/autenticacion/olvide-mi-contrasena',
    //   destination: '/authentication/forgotten-password',
    // },
    // {
    //   source: '/autenticacion/recuperar-contrasena',
    //   destination: '/authentication/password-recovery',
    // },
    // {
    //   source: '/autenticacion/cerrar-sesion',
    //   destination: '/authentication/sign-out',
    // },

    // {
    //   source: '/tablero',
    //   destination: '/dashboard',
    // },
    // {
    //   source: '/comenzar',
    //   destination: '/onboarding',
    // },
  },
};
