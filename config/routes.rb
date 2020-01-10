Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # modify HTTP verb of create and destroy routes to post/delete data
      # modify routes of show and destroy by adding id parameter - id holds identification no.
      get 'tasks/index'
      post 'tasks/create'
      get '/show/:id', to: 'tasks#show'
      # delete 'tasks/:id', to: 'tasks#destroy'
      delete 'tasks/:id', to: 'tasks#destroy'
      put 'tasks/:id', to: 'tasks#edit'
    end
  end
  root 'homepage#index'
  # adds a catch all route that directs any other request that doesn't match existing routes to index action
  # of homepage controller
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
