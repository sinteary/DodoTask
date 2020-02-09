class User < ApplicationRecord
  has_secure_password
  has_many :tasklists
  has_many :tags

  validates :email, uniqueness: true
  validates :email, presence: true
  validates :email, uniqueness: true

  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  def as_json(options={})
    super(:except => [:created_at, :updated_at],
          :include => { 
            :tasklists => {},
            :tags => {}
          })
  end

end
