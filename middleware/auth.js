// If it's a private page and there's no payload, redirect.
export default function(context) {
  const { store, route, redirect } = context
  const { auth } = store.state
  store
    .dispatch('auth/authenticate')
    .then((result) => {
      console.log(auth.user)
      if (!auth.user.mobileConfirm) {
        return redirect('/confirm')
      }
      if (auth.user.userTypeId > 1 && !auth.user.allowWork) {
        return redirect('/UploadLicense')
      }
    })
    .catch((error) => {
      console.log(error)
      if (!auth.publicPages.includes(route.name)) {
        return redirect('/login')
      }
    })
}
