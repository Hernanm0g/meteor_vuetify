/**
 *
 * Mixin for Avatar Management
 *
 */
import {UsersMedia} from '../../../api/collections/usersMedia/client'
export const GetAvatarMixin = {
  meteor: {
    $subscribe: {
      "usersMedia.get.by.user.and.type": [{type:"avatar"}]
    },
    userId(){
      return Meteor.userId()
    },
    user(){
      return Meteor.user()
    },
    avatar(){
      if (!this.userId || !(this.user && this.user.profile)) {
        return "/img/logo.png"
      }
      
      let avatar = UsersMedia.findOne(
        {
          "meta.user": this.userId,
          "meta.type": "avatar",
          isImage:true
        },
        {
          sort: {
            "meta.created":-1
          },  
          limit:1
        }
      );
      if (!avatar) {
        return this.user.profile.picture
      }
      avatar = avatar.link("thumbnail");
      if (!avatar) {
        return this.user.profile.picture
      }
      return avatar
    }
  },
}

