use juniper::{EmptyMutation, FieldResult};
use juniper::{EmptySubscription, RootNode};

use juniper::GraphQLObject;

#[derive(GraphQLObject)]
struct Post {
    name: String,
    body: String,
    date: String,
}

pub struct QueryRoot;

#[juniper::graphql_object]
impl QueryRoot {
    fn all_posts() -> FieldResult<Vec<Post>> {
        Ok(vec![Post {
            name: "Hell".to_string(),
            body: "no".to_string(),
            date: "swag".to_string(),
        }])
    }

    fn post_by_name(name: String) -> FieldResult<Post> {
        Ok(Post {
            name,
            body: "swag".to_string(),
            date: "no".to_string(),
        })
    }
}

pub type Schema = RootNode<'static, QueryRoot, EmptyMutation, EmptySubscription>;

pub fn create_schema() -> Schema {
    Schema::new(QueryRoot {}, EmptyMutation::new(), EmptySubscription::new())
}
