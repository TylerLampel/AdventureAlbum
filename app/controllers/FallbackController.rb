class FallbackController < ActionController::Base
    def index
      # Render the 'public/index.html' file
      render file: 'public/index.html'
    end
  end