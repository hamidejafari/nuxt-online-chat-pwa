<template>
  <v-card max-width="600" class="mx-auto card-profile">
    <v-list-item
      three-line
      class="indigo mb-2 back-avatar"
      style="position: relative;"
    >
      <v-list-item-avatar
        size="80"
        color="grey"
        class="my-4 mx-auto avatar-profile"
        style="position: absolute;left: 0;right: 0;bottom: -6vh;"
      >
        <img :src="userAvatar" alt="Animoshaver" />
      </v-list-item-avatar>
    </v-list-item>
    <v-container class="pt-0">
      <Profile style="margin-top: 5vh;" />
    </v-container>
    <BtnProfile />
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import BtnProfile from '~/components/ButtonsProfile.vue'
import Profile from '~/components/Profile.vue'
export default {
  components: {
    BtnProfile,
    Profile
  },
  data: () => ({}),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', {
      userAvatar: 'userAvatar',
      userWallet: 'userWallet'
    })
  }
}
</script>
<style>
.avatar-profile {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7) !important;
}
.back-avatar {
  border-radius: 0 0 100% 100% !important;
}
.back-avatar .v-list-item__avatar {
  height: 80px !important;
  min-width: 80px !important;
  width: 80px !important;
}
.card-profile {
  box-shadow: none !important;
}
</style>
