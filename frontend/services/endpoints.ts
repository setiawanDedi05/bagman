export const endpoint = {
    auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
        verifyEmail: '/api/auth/verify-email'
    },
    user: {
        parent: '/api/user',
        updateFcmToken: '/api/user/fcm-token-update'
    },
    projects: {
        fetchAll: '/api/projects',
        parent: '/api/projects'
    },
    tasks: {
        parent: "/api/tasks",
        fetchTaskMine: '/api/tasks/search',
        recenTask: '/api/tasks/recent-task',
        countThisMonth: '/api/tasks/count-this-month'
    }
}
