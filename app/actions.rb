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
  results = {result: false}
  puts name + email
  user = Users.new(name: name, email: email)
  if user.save
    results[:result] = true
    results[:id] = user.id
  end
  results.to_json
end

get '/users/:id/delete' do
  results = {result: false}
  if Users.find(params[:id]).destroy
    results[:result] = true
  end

  results.to_json
end