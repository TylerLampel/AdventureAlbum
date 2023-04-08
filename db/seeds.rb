User.create!([{
    username: "tyler",
    password: "123"
},
{
    username: "luca",
    password: "123"
}])

Vacation.create!([{
    title: "Ocean City 2023",
    departure_date: DateTime.new(2023, 6, 15),
    return_date: DateTime.new(2023, 6, 22),
    user_id: 1
},
{
    title: "Anniversary Getaway",
    departure_date: DateTime.new(2023, 10, 20),
    return_date: DateTime.new(2023, 10, 27),
    user_id: 1
},
{
    title: "Ocean City 2023",
    departure_date: DateTime.new(2023, 6, 15),
    return_date: DateTime.new(2023, 6, 22),
    user_id: 2  
}])