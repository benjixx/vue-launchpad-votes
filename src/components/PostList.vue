<template>
  <ul id="posts">
    <li v-for="post in sortedPosts">
      <a @click="upvotePost(post)">{{ post.title }} ({{ post.votes }})</a>
    </li>
  </ul>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    posts: {
      query: gql`{
        posts {
          id
          title
          votes
        }
      }`,
    }
  },

  data () {
    return {
      posts: [],
    }
  },

  computed: {
    sortedPosts() {
      const sortedPosts = this.posts.slice()
      sortedPosts.sort((a, b) => b.votes - a.votes)
      return sortedPosts
    }
  },

  methods: {
    upvotePost(post) {
      console.log('upvoting post ' + post.id)
      this.$apollo.mutate({
        mutation: gql`mutation ($postId: Int!) {
          upvotePost(postId: $postId) {
            id
            votes
          }
        }`,

        variables: {
          postId: post.id
        },

        optimisticResponse: {
          __typename: 'Mutation',
          upvotePost: {
            __typename: 'Post',
            id: post.id,
            votes: post.votes + 1
          }
        }
      }).then((data) => {
        // Result
        console.log('result')
        console.log(data)
      }).catch((error) => {
        // Error
        console.log('error')
        console.error(error)
      })
    }
  }
}
</script>
