<script setup lang="ts">
import {routesMap} from "~/utils/routes";
import {$fetch} from "ofetch";
import {debounce} from "~/utils/debounce";

const route = useRoute()
const {status, data} = useAuth()

if (status.value !== 'authenticated' || data.value.role !== 'ADMIN') {
    await navigateTo('/')
}

const manageCategories = [
    'USERS',
    'ARTICLES',
    'FILES',
    'COURSES',
    'YEARS'
]

watch(status, async (newStatus) => {
    console.log(newStatus)
    if (newStatus !== 'authenticated') {
        await navigateTo('/')
    }
})

const {
    data: articlesData,
    pending: articlesPending,
    error: articlesError,
    refresh: articlesRefresh
} = useFetch(routesMap['adminPanel'], {
    query: {
        data: 'articles'
    },
    server: false,
    lazy: true
})

const {
    data: coursesData,
    pending: coursesPending,
    error: coursesError,
    refresh: coursesRefresh
} = useFetch(routesMap['adminPanel'], {
    query: {
        data: 'courses'
    },
    server: false,
    lazy: true
})

watch(coursesData, (newData) => {
    yearsState.value = newData.years
    coursesState.value = newData.courses
})

const category = useState(() => manageCategories[1])
const searchString = useState(() => ({
    search: '',
    proxy: ''
}))
const newCourse = useState(() => ({
    title: "",
    year: 0
}))
const newYear = useState(() => ({
    title: "",
    priority: 0
}))
const yearsState = useState(() => [])
const coursesState = useState(() => [])

function deleteArticle(id) {
    $fetch(routesMap['deleteArticle'], {
        method: 'DELETE',
        body: {
            articleId: id
        }
    }).then((val) => {
        console.log(`deleted article ${val}`)
        articlesRefresh()
    }, (err) => {
        console.log(err.data)
    })
}

function deleteCourse(id) {
    $fetch(routesMap['editCourses'], {
        method: 'DELETE',
        body: {
            courseId: id
        }
    }).then((val) => {
        console.log(`deleted course ${val}`)
        coursesRefresh()
    }, (err) => {
        console.log(err.data)
    })
}

function createCourse() {
    if (newCourse.value.year === 0) {
        return
    }

    $fetch(routesMap['editCourses'], {
        method: 'POST',
        body: {
            title: newCourse.value.title,
            year: newCourse.value.year
        }
    }).then((val) => {
        newCourse.value.title = ""
        newCourse.value.year = 0
        console.log(`created course ${val}`)
        coursesRefresh()
    }, (err) => {
        console.log(err.data)
    })
}

function updateCourse() {
    $fetch(routesMap['editCourses'], {
        method: 'PUT',
        body: {
            courses: coursesState.value
        }
    }).then((val) => {
        console.log(`updated courses ${val}`)
        coursesRefresh()
    }, (err) => {
        console.log(err.data)
    })
}

function deleteYear(id) {
    $fetch(routesMap['editYears'], {
        method: 'DELETE',
        body: {
            yearId: id
        }
    }).then((val) => {
        console.log(`deleted year ${val}`)
        coursesRefresh()
    }, (err) => {
        console.log(err.data)
    })
}

function createYear() {
    if (newYear.value === "") {
        return
    }

    $fetch(routesMap['editYears'], {
        method: 'POST',
        body: {
            title: newYear.value.title,
            priority: newYear.value.priority
        }
    }).then((val) => {
        newYear.value.title = ""
        newYear.value.priority = 0

        console.log(`created year ${val}`)
        coursesRefresh()
    }, (err) => {
        console.log(err.data)
    })
}

function updateYear() {
    $fetch(routesMap['editYears'], {
        method: 'PUT',
        body: {
            years: yearsState.value
        }
    }).then((val) => {
        console.log(`updated years ${val}`)
        coursesRefresh()
    }, (err) => {
        console.log(err.data)
    })
}

function search() {
    searchString.value.search = searchString.value.proxy.toLowerCase()
}

const debouncedSearch = debounce(search, 300)

</script>

<template>
    <Head>
        <Title>
            Admin
        </Title>
    </Head>
    <div class="flex flex-col container mx-auto px-2 h-0 min-h-full">
        <div class="card bg-base-200 h-full w-0 min-w-full">
            <div class="card-body p-4 gap-0 h-0 min-h-full overflow-y-auto scrollbar">
                <div class="card-title rounded-lg bg-base-300 p-4">
                    <h1 class="text-2xl break-all">Admin</h1>
                </div>
                <div class="join justify-center my-2 flex-wrap">
                    <button v-for="_category in manageCategories"
                            :class="`join-item btn ${category === _category ? 'btn-accent' : ''}`"
                            @click="category = _category"
                    >{{ _category }}
                    </button>
                </div>

                <template v-if="category === 'USERS'">
                    <div class="hero min-h-full bg-base-200">
                        <div class="hero-content text-center">
                            <div class="max-w-md">
                                <h1 class="text-5xl font-bold">There will be admin tools for users</h1>
                            </div>
                        </div>
                    </div>
                </template>


                <template v-if="category === 'ARTICLES'">
                    <FetchPlaceholder :pending="articlesPending" :error="articlesError">
                        <input type="text" class="input bg-base-300 my-2 border border-accent flex-none"
                               @input="debouncedSearch()" v-model="searchString.proxy" placeholder="search...">

                        <div class="flex flex-col gap-2 h-0 min-h-full">
                            <template
                                v-for="article in articlesData.articles.filter((el) => el.title.toLowerCase().includes(searchString.search))">
                                <div
                                    class="card bg-base-300 border border-base-300 break-words hover:border-accent w-0 min-w-full">
                                    <div class="card-body p-6">
                                        <h2 class="card-title text-lg break-all w-0 min-w-full">{{ article.title }}</h2>
                                        <p>by {{ article.author.username }}</p>
                                        <div class="card-actions justify-end">
                                            <NuxtLink :to="`/theme/${article.courseId}/article/${article.id}`">
                                                <button class="btn btn-sm btn-outline">Open</button>
                                            </NuxtLink>
                                            <button class="btn btn-sm btn-error" @click="deleteArticle(article.id)">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-if="articlesData.articles.length === 0">
                                <div class="hero min-h-full bg-base-200">
                                    <div class="hero-content text-center">
                                        <div class="max-w-md">
                                            <h1 class="text-5xl font-bold">No articles</h1>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </FetchPlaceholder>
                </template>


                <template v-if="category === 'FILES'">
                    <div class="hero min-h-full bg-base-200">
                        <div class="hero-content text-center">
                            <div class="max-w-md">
                                <h1 class="text-5xl font-bold">There will be admin tools for files</h1>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="category === 'COURSES'">
                    <FetchPlaceholder :pending="coursesPending" :error="coursesError">
                        <div class="overflow-x-auto">
                            <table class="table">
                                <!-- head -->
                                <thead>
                                <tr>
                                    <th class="hidden sm:block">ID</th>
                                    <th>Name</th>
                                    <th class="w-1/6">Year</th>
                                    <th class="w-1/12"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <!-- rows -->
                                <tr v-for="course in coursesState">
                                    <th class="hidden sm:block">{{ course.id }}</th>
                                    <td>
                                        <input v-model="course.title" type="text" class="input w-full">
                                    </td>
                                    <td>
                                        <select v-model="course.year.id" class="select w-full max-w-xs">
                                            <option disabled :value="0">Year</option>
                                            <option v-for="year in coursesData.years" :value="year.id">
                                                {{ year.title }}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-error w-full" @click="deleteCourse(course.id)">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                <!-- input -->
                                <tr>
                                    <th class="hidden sm:block"></th>
                                    <td>
                                        <input v-model="newCourse.title" type="text" class="input w-full">
                                    </td>
                                    <td>
                                        <select v-model="newCourse.year" class="select w-full max-w-xs">
                                            <option disabled :value="0">Year</option>
                                            <option v-for="year in coursesData.years" :value="year.id">
                                                {{ year.title }}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-accent" @click="createCourse()">Create</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="hidden sm:block"></th>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <button class="btn btn-sm btn-accent w-full" @click="updateCourse()">Save
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </FetchPlaceholder>
                </template>

                <template v-if="category === 'YEARS'">
                    <FetchPlaceholder :pending="coursesPending" :error="coursesError">
                        <div class="overflow-x-auto">
                            <table class="table table-auto">
                                <!-- head -->
                                <thead>
                                <tr>
                                    <th class="hidden sm:block">ID</th>
                                    <th>Name</th>
                                    <th class="w-1/6">Priority</th>
                                    <th class="w-1/12"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <!-- rows -->
                                <tr v-for="year in yearsState">
                                    <th class="hidden sm:block">{{ year.id }}</th>
                                    <td><input v-model="year.title" type="text" class="input w-full"></td>
                                    <td><input v-model="year.priority" type="number" class="input w-full"></td>
                                    <td>
                                        <button class="btn btn-sm btn-error" @click="deleteYear(year.id)">Delete
                                        </button>
                                    </td>
                                </tr>
                                <!-- input -->
                                <tr>
                                    <th class="hidden sm:block"></th>
                                    <td>
                                        <input v-model="newYear.title" type="text" class="input w-full">
                                    </td>
                                    <td>
                                        <input v-model="newYear.priority" type="number" class="input w-full">
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-accent w-full" @click="createYear()">Create
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="hidden sm:block"></th>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <button class="btn btn-sm btn-accent w-full" @click="updateYear()">Save</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </FetchPlaceholder>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "assets/css/common.css";
</style>