import sys

with open(".vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory", "r") as inventory_file:
    for line in inventory_file.readlines():
        if line.startswith("default "):
            for part in line.split(" "):
                if "=" in part:
                    key, value = part.split("=")
                    if key == sys.argv[1]:
                        print(value)
                        exit(0)
exit(1)
