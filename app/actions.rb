# Homepage (Root path)
get '/' do
  erb :index
end

get '/users' do
  Users.all.to_json
end

post '/users' do
  name = params[:name]
  email = params[:email]

  user = User.create(name: name, email: email)
end