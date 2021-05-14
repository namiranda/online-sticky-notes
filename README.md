
# Online Sticky Notes

 Collaborative real-time sticky notes app

 


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express, MongoDB, Socket.io

  
## API Reference

#### Get all workspaces from a user

```http
  GET /api/workspaces/:user_id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id` | `string` | **Required**. Id of workspaces owner |

#### Add workspace 

```http
  POST /api/workspaces/:user_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. Id of workspaces owner |

#### Delete workspace 

```http
  DELETE /api/workspaces/:user_id/:workspace_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. Id of workspace owner |
| `workspace_id`      | `string` | **Required**. Id of workspace to delete  |


#### createNote(workspace_id, content)

Creates a note and add it to the workspace.

#### getNotes(workspace_id)

Returns an array containing all the notes in the workspace.
  
  
  ## Client Side Repo
  
  https://github.com/namiranda/sticky-notes-client
