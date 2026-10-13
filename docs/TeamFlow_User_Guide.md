# TeamFlow — Help Guide & Demo Walkthrough

**Version:** Review build with task-planning assistant  
**Updated:** October 12, 2026  
**Audience:** People reviewing the demo, team members, and portfolio reviewers

## 1. What is TeamFlow?

TeamFlow is a project management application for organizing work inside team workspaces. Users create projects, assign tasks, track progress, and review activity. Its task planner lets users describe a goal, review proposed tasks, and approve the tasks they want to create.

The project uses the MERN stack: MongoDB for data, Express and Node.js for the API, and React for the interface. It is intended to demonstrate backend engineering through workspace isolation, permission checks, session authentication, validation, and AI integration.

**Open the review demo:**
https://teamflow-backend-portfolio.danielmorales839000.chatgpt.site

The review site is private and may require the owner's ChatGPT account.

## 2. Demo mode versus the complete application

| Capability | Hosted demo | MERN application with configured services |
|---|---|---|
| Projects and tasks | Sample records, editable locally | API-backed records stored in MongoDB |
| Task board and list | Available | Available |
| Team membership and roles | Simulated using sample members | Enforced by the backend |
| Registration and sign-in | Requires a separate working API; unavailable on the static demo | Implemented in the Express API |
| Generate task plan | Local sample template; no model call | Calls the configured AI provider |
| Save approved suggestions | Adds tasks to browser-local demo data | Saves tasks through the API |
| Shared collaboration | Each browser has its own demo state | Users access their authorized workspace records |

**The hosted demo does not demonstrate live AI inference or live MongoDB persistence.** Backend code is implemented, but live-provider and database workflows have not yet been verified. Demo interactions are not proof that server-side permissions have passed integration testing.

## 3. Find your way around

| Area | Purpose |
|---|---|
| Project board | View the selected project's tasks by workflow status. |
| All projects | Browse projects and open their boards. |
| Team members | View members and their workspace roles. |
| Activity log | Review recent task, project, and membership changes. |
| Your projects | Quickly switch to another project from the sidebar. |
| New task | Create a task in the current project. |
| Generate task plan | Open the planning assistant. |
| Board / List | Switch between columns and a table. |
| Search tasks | Find tasks by words in their titles. |
| All priorities | Filter to high, medium, or low priority. |
| Reset demo | Restore the original sample workspace after confirmation. |

The summary cards show total tasks, tasks in progress, completed tasks, and completion percentage. These numbers follow the current search and priority filters.

## 4. Create and manage tasks

### Create a task

1. Open a project, such as **Platform launch**.
2. Click **New task**, or **Add task** in a board column.
3. Enter a title and, optionally, a description.
4. Choose a status and priority.
5. Select a workspace member to assign the task, or leave it unassigned.
6. Add a due date if needed.
7. Click **Save task**.

### Update a task

Click a task card or a row in List view. Edit the fields and save. A task title is required.

### Move work through the board

The statuses are **To do**, **In progress**, **In review**, and **Done**. Drag a task into another column, or open its editor and change Status. Use the editor as an alternative when dragging is inconvenient.

### Delete a task

Owners and admins can open a task, click **Delete task**, and confirm. Members cannot delete tasks through the backend. The hosted demo starts as a simulated owner.

## 5. Use the task planner

1. Open the project where the tasks should be created.
2. Click **Generate task plan**.
3. Describe a goal in 15–3,000 characters. For example:

   > Build an e-commerce backend with authentication, products, orders, and payments.

4. In the hosted demo, click **Preview sample plan**. In the live application, click **Generate task plan**.
5. Review the summary and proposed tasks.
6. Edit titles, descriptions, priorities, and due dates.
7. Uncheck tasks you do not want to create.
8. Click **Approve & add tasks**.

Only selected tasks are added. New tasks start in **To do**, with no assignee. Assign them afterward using the task editor.

**Generating or previewing a plan does not create tasks.** Close the planner to cancel before approval. **Start over** returns to goal entry.

In demo mode, the plan is a reusable sample template, not an AI interpretation of the goal. The goal is included in the sample context, but the suggested workflow remains template-based.

In live mode, the AI receives the entered goal and the current project's name and description. It does not receive member emails, other projects, or existing task records. AI suggestions should be checked for relevance and feasibility before approval. Dates are optional; include actual calendar dates in your goal when requesting deadlines.

Pending live plans expire after 24 hours and can be approved only by the user who generated them. The first approved selection is fixed, so retries use that selection rather than adding a different batch.

## 6. Projects, members, and permissions

Create a project using **New project** on the All projects page. Enter a name and description, then save. Project creation requires owner or admin permissions in the live application.

Use **Add member** on the Team members page to add someone by email. For the live application, that person must have registered an account first. This version does not send an email invitation.

| Action | Owner | Admin | Member |
|---|---|---|---|
| View projects, tasks, members, and activity | Yes | Yes | Yes |
| Create or edit tasks; generate and approve own plans | Yes | Yes | Yes |
| Create projects and add registered members | Yes | Yes | No |
| Delete tasks | Yes | Yes | No |
| Change member/admin roles | Yes | No | No |

On the Team members page, an owner can change a non-owner's role using the role selector. The role endpoint cannot demote an owner. Backend queries check workspace membership and restrict access to the requested organization's records.

## 7. A three-minute demo walkthrough

Use this sequence when demonstrating the project. It is a suggested presentation, not a claim that live integration testing has been completed.

| Time | What to show | Suggested explanation |
|---|---|---|
| 0:00–0:20 | Project board and Demo mode badge | “TeamFlow organizes a team's work in separate workspaces. This preview uses sample data saved in this browser.” |
| 0:20–0:45 | Open a card; change priority or assignee | “Each task has a status, priority, assignee, description, and deadline.” |
| 0:45–1:05 | Move a card, switch to List, search its title | “The same tasks can be managed from a board or a list, with search and priority filtering.” |
| 1:05–1:50 | Enter the e-commerce goal; preview suggestions | “The planner proposes a task breakdown. This hosted preview uses a sample template; the MERN backend includes the real provider integration.” |
| 1:50–2:15 | Edit a title; deselect two tasks; approve four | “Users stay in control: nothing is added until they approve their selected tasks.” |
| 2:15–2:40 | Show the new tasks and Activity log | “Approved tasks enter To do, and workspace activity records the change.” |
| 2:40–3:00 | Show Team members | “The backend implements owner, admin, and member permissions. Live permission enforcement needs the configured server.” |

The separate 48-second demo video is an **animated walkthrough**, not a screen recording. It has English captions, no voiceover, and identifies its sample data.

## 8. Troubleshooting

| Issue | What to do |
|---|---|
| Sign-in does not work on the review site | Use the interactive demo. Real accounts need the running Express API and MongoDB. |
| The sample plan looks similar for different goals | Expected: the hosted preview uses a local template rather than a model. |
| Tasks seem to be missing | Clear the title search, set priority to All priorities, and check the selected project. |
| Another person cannot see my demo changes | Expected: demo changes belong to this browser, not a shared database. |
| Demo changes disappeared | Browser storage may have been cleared or a different browser/profile used. |
| A member cannot create projects or delete tasks | That action requires an owner or admin role. |
| Adding a live member fails | Confirm that they registered and that their account email is correct. |
| “AI is not configured” | Configure the provider key and model on the server; do not enter a secret in the frontend. |
| AI times out or returns invalid output | Retry generation. Failed generation does not create project tasks. |
| Daily AI limit reached | The live backend allows 20 generation attempts per user per UTC day. |
| A live plan is expired | Generate and review a new plan. |

Demo data is stored in localStorage. Refreshing normally keeps changes; **Reset demo** restores the samples. Pending planner edits are not persisted in the React interface across a refresh.

## 9. Current scope and verification

The source includes accounts, workspaces, registered-member onboarding, projects, task CRUD, board/list views, search, priority filtering, activity, and the AI planning integration.

Email invitations, password reset, project deletion, member removal, file uploads, real-time updates, AI workspace Q&A, and AI progress summaries are not implemented.

The frontend build and 11 automated backend/security tests passed. AI-provider tests use mocked responses. Live AI, MongoDB workflows, database concurrency, and end-to-end browser behavior remain unverified.

The frontend loads up to 100 tasks for a live project. The API supports pagination for larger datasets. Multi-task approval is retryable rather than transactional, and audit logging can be incomplete across failures.

## 10. Developer handoff

The source README contains local setup commands, environment configuration, API routes, architecture, and AI request limits. To run the complete app, configure MongoDB, start the Express server, and launch the React client. Real AI additionally requires `OPENROUTER_API_KEY` and `AI_MODEL` in the server environment.

The project ZIP remains withheld until the user approves its delivery. This help guide can be reviewed independently of the source package.
