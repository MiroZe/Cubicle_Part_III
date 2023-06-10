


function optionSelect(difficultyLevel) {

    const titles = [
        'Very Easy',
        'Easy',
        'Medium (Standard 3x3)',
        'Intermediate',
        'Expert',
        'Hardcore',
    ];

    const options = titles.map((title, index) => ({
        title: `${index + 1} - ${title}`,
        value: index + 1,
        selected: Number(difficultyLevel) === index + 1,
    }));

    return options;
}


function parseErrors (error) {
    if(error.name == 'ValidationError') {
        return Object.values(error.errors).map(v=> v.message)
    } else {
        return error.message.split('\n')
    }
}

module.exports = {
    optionSelect,
     parseErrors}