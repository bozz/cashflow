Factory.define :valid_user , :class => User do |u|
  u.username "admin"
  u.password "admin"
  u.password_confirmation "admin"
  u.email "admin@admin.com"
  u.single_access_token "k3cFzLIQnZ4MHRmJvJzg"
end

Factory.define :invalid_user , :class => User do |u|
end