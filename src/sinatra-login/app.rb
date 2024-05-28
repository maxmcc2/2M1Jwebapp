require 'sinatra'
require 'mysql2'

configure do
  set :db_client, Mysql2::Client.new(
    host: 'localhost',
    username: 'root',
    password: 'maxmccauley',
    database: '2M1J'
  )
end

get '/' do
  erb :login
end

post '/login' do
  uname = params[:uname]
  password = params[:password]

  client = settings.db_client
  result = client.query("SELECT * FROM users WHERE username='#{client.escape(uname)}' AND password='#{client.escape(password)}'")

  if result.count > 0
    redirect '/results'
  else
    @error = 'Invalid username or password! Try Again!'
    erb :login
  end
end

get '/results' do
    redirect 'http://localhost:8080/view/overall_ranks.html'
end
