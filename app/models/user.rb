class User < ApplicationRecord
    has_many :vacations
    
    has_secure_password

    validates :username, presence: true. uniqueness: true
end
