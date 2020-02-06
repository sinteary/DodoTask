class User < ApplicationRecord
  has_secure_password
  has_many :tasklists

  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :email, presence: true
  validates :email, uniqueness: true

  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  def as_json(options={})
    super(:except => [:created_at, :updated_at],
          :include => { 
            :tasklists => {}
          })
  end


end
