# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "bento/ubuntu-18.04"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # dev node process
  config.vm.network "forwarded_port", guest: 3000, host: 3000, host_ip: "127.0.0.1"
  # dev (node helper process)
  config.vm.network "forwarded_port", guest: 3001, host: 3001, host_ip: "127.0.0.1"
  # Postgres
  config.vm.network "forwarded_port", guest: 5432, host: 6543, host_ip: "127.0.0.1"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.

  # Using VirtualBox:
  config.vm.provider :virtualbox do |vm|
    # # Display the VirtualBox GUI when booting the machine
    # vb.gui = true

    # # Customize the amount of memory on the VM:
    # vb.memory = "1024"

    # Enable creating symlinks in shared folder
    # On a Windows host, vagrant will need to run with permissions to 'Create Symlinks', either
    # set for the current user in the Local Security Policy, or run from a shell with
    # Administrative rights.
    vm.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
  end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", path: "provision/vm_provision.sh"
end
