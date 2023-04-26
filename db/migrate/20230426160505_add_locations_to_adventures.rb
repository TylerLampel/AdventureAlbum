class AddLocationsToAdventures < ActiveRecord::Migration[7.0]
  def change
    add_reference :adventures, :location, null: false, foreign_key: true
  end
end
