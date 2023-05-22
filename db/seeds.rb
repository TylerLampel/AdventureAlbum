User.create!([{
    username: "tyler",
    password: "123"
},
{
    username: "luca",
    password: "123"
}])

Vacation.create!([{
    title: "Ocean City 2022",
    departure_date: DateTime.new(2022, 6, 15),
    return_date: DateTime.new(2022, 6, 22),
    user_id: 1
},
{
    title: "Anniversary Getaway",
    departure_date: DateTime.new(2022, 10, 20),
    return_date: DateTime.new(2022, 10, 27),
    user_id: 1
},
{
    title: "Ocean City 2022",
    departure_date: DateTime.new(2022, 6, 15),
    return_date: DateTime.new(2022, 6, 22),
    user_id: 2  
}])
