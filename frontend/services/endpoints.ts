export const endpoint = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        verifyEmail: '/auth/verify-email'
    },
    projects: {
        fetchAll: '/projects',
        parent: '/projects'
    },
    tasks: {
        parent: "/tasks",
        fetchTaskMine: '/tasks/search',
        recenTask: '/tasks/recent-task',
        countThisMonth: '/tasks/count-this-month'
    }
}