# -*- mode: ruby -*-
# vi: set ft=ruby :
=begin
@author:  Charleston Malkemus
@date:    November 2, 2016
@app:     Box Lunch
@descriptions:	NodeBox 
Installed:	Nodejs, npm
OS: 		Ubuntu 14.04.
Specs: 		1GB 1CPU <  40% cpu
=end


ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'
Vagrant.require_version ">= 1.6.0"

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.box_url = "https://atlas.hashicorp.com/ubuntu/trusty64"

  config.vm.hostname = "charlle"
  config.vm.network "forwarded_port", guest: 80, host: 3000, auto_correct: true
  config.vm.network "private_network", ip: "10.99.88.77"
  # config.ssh.private_key_path = "local/insecure_key"

  config.vm.synced_folder ".", "/var/www/", type: "nfs"

  config.vm.define "charlle" do |v|
    v.vm.provider "virtualbox" do |vb|

  	  vb.customize ["modifyvm", :id, "--cpuexecutioncap", "40"]
      vb.memory = "1024"
      vb.cpus = "1"

    end

    v.vm.provision "shell", inline: <<-SHELL
      # sudo apt-get update
      # sudo apt-get upgrade
      # sudo apt-get -y install build-essential openssl libssl-dev pkg-config git vim
      

      # NODEJS
      # sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo bash -
      # sudo apt-get -y install nodejs npm nodejs-legacy 
      # sudo npm install --global javascripting
      # /usr/lib/node_modules/javascripting

    SHELL

  end

  config.vm.post_up_message = "You're ready to test & drive!"

end



