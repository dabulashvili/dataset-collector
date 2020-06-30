for ARGUMENT in "$@"
do

    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)   

    case "$KEY" in
            user)       user=${VALUE} ;;
            sentences)  sentences=${VALUE} ;;
            output)     output=${VALUE} ;;
            *)   
    esac    


done

echo $user

while read p; do
  id=$(echo -n $p | md5sum)
  echo $id
done < $sentences