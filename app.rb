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
      { output: slim_to_html(r.params) }
    rescue StandardError => e
      response.status = 422
      { error: "#{e.class}\n#{e.message}" }
    end
  end
end

def slim_to_html(params)
  input, options = parsed_params(params)
  Slim::Template.new(**options) { input }.render
end

def parsed_params(params)
  options = params.slice('input', 'pretty', 'sort_attrs')
  [options.delete('input'), options.transform_keys(&:to_sym)]
end
