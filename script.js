let coursesData = [];
let currentPage = 1;
const itemsPerPage = 3;

window.onload = async function () {
    try {
        const response = await fetch('playlist.json'); // Fetching from local JSON file
        const data = await response.json();
        coursesData = data.courses;
        displayCourses(coursesData);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
};

// Display and Paginate Courses
function displayCourses(courses, page = 1) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const paginatedCourses = courses.slice(startIndex, endIndex);

    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = '';

    paginatedCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('bg-black', 'shadow-lg', 'rounded-lg', 'p-4', 'mb-4');
        courseElement.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover rounded-t-lg mb-4">
            <h3 class="text-lg font-semibold">${course.title}</h3>
            <p class="text-sm mb-2">${course.description}</p>
            <p class="text-sm mb-2"><strong>Price:</strong> $${course.price}</p>
            <p class="text-sm mb-2"><strong>Level:</strong> ${course.level}</p>
            <a href="${course.url}" target="_blank" class="text-blue-500 hover:underline">Learn more</a>
        `;
        coursesContainer.appendChild(courseElement);
    });

    displayPagination(courses.length);
}

// Display Pagination
function displayPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('mx-1', 'bg-blue-500', 'text-white', 'p-2', 'rounded');
        pageBtn.innerText = i;
        pageBtn.onclick = () => {
            currentPage = i;
            displayCourses(coursesData, currentPage);
        };
        pagination.appendChild(pageBtn);
    }
}

// Sort Courses
function sortCourses() {
    const sortOption = document.getElementById('sortOption').value;

    if (sortOption === 'priceLowToHigh') {
        coursesData.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
        coursesData.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'levelBeginner') {
        coursesData = coursesData.filter(course => course.level.toLowerCase() === 'beginner');
    } else if (sortOption === 'levelMedium') {
        coursesData = coursesData.filter(course => course.level.toLowerCase() === 'medium');
    } else if (sortOption === 'levelHard') {
        coursesData = coursesData.filter(course => course.level.toLowerCase() === 'hard');
    }
    displayCourses(coursesData, currentPage);
}

// Filter Courses by Search
function filterCourses() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredCourses = coursesData.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query)
    );
    displayCourses(filteredCourses, currentPage);
}
