# frozen_string_literal: true

require 'bundler/setup'
require 'roda'

require 'slim'

Slim::Engine.set_options pretty: true

# Roda App
class App < Roda
  plugin :public
  plugin :render, engine: 'slim'
  plugin :json
  plugin :json_parser

  route do |r|
    r.public

    r.root do
      render :index
    end

    r.post 'slim' do
      { output: slim_to_html(r.params['input'], r.params['pretty']) }
    end
  end
end

def slim_to_html(str, pretty)
  Slim::Template.new(pretty:) { str }.render
end
