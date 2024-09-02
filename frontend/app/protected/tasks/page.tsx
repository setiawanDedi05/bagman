import { Task, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "728ed52123",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "12342134",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "12341234",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "728ed5123412342f",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    // ...
    {
      id: "728ed52f",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "728ed52123",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "12342134",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "12341234",
      title: "pop-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "728ed5123412342f",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    // ...
    {
      id: "728ed52f",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "728ed52123",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "12342134",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "12341234",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    {
      id: "728ed5123412342f",
      title: "OBM-100",
      status: "backlog",
      description: "Create ERD FutsalYuks!",
    },
    // ...
  ]
}

export default async function TasksPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
