class CreateAdventures < ActiveRecord::Migration[7.0]
  def change
    create_table :adventures do |t|
      t.string :title
      t.belongs_to :vacation, null: false, foreign_key: true

      t.timestamps
    end
  end
end
