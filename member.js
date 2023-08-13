function skillsMember() {
    var member = {
        name: 'John Doe',
        age: 30,
        address: '123 Main St',
        skills: [
            'JavaScript',
            'jQuery',
            'HTML',
            'CSS'
        ],
        addSkill: function (skill) {
            this.skills.push(skill);
        }
    };
    member.addSkill('Node.js');
    return member;
}