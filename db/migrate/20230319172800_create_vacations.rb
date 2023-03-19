class CreateVacations < ActiveRecord::Migration[7.0]
  def change
    create_table :vacations do |t|
      t.string :title
      t.datetime :departure_date
      t.datetime :return_date
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
