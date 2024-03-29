
# Online Sticky Notes

 Collaborative real-time sticky notes app

 


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express, MongoDB, Socket.io

## Quick Demo

https://stickytopiks.netlify.app/60a028196fdc8538eec14cf1/workspaces/60a02e3d8413970015d30310

Open the same link in two different tabs/windows to see ✨ the magic ✨

Note: It takes a few seconds for the server to start up, you won't be able to see the notes until then

![ezgif com-gif-maker](https://user-images.githubusercontent.com/49685356/119281814-8d878e00-bc0d-11eb-9f82-b11ceb9e0cc6.gif)
  
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

#### deleteNote(workspace_id, note_id)

Removes a note from a workspace (and database).
  
  
  ## Client Side Repo
  
  https://github.com/namiranda/sticky-notes-client
